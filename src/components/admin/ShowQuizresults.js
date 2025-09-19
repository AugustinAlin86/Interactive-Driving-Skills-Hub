"use client";

import { useEffect, useState, useMemo } from "react";
import { useUserStatus } from "@/hooks/useUserStatus";
import { getIdToken } from "@/lib/client/clientAuthService";
import { useRouter } from "next/navigation";
import { formatFirestoreDate } from "@/lib/utils/dateUtils";
import "../admin/style/ShowQuizresults.css"



export default function AdminShowQuizResults() {
  const { user, isAdmin, loading } = useUserStatus();
  const router = useRouter();

  const [attempts, setAttempts] = useState([]); 
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterScore, setFilterScore] = useState("all");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace("/login");
    }
  }, [loading, user, isAdmin, router]);

  const fetchAttempts = async (search) => {
    if (!search.trim()) return;
    try {
      setLoadingAttempts(true);
      setError("");

      const token = await getIdToken();
      if (!token) throw new Error("Not authenticated");

      const res = await fetch(`/api/admin/quizResults?search=${search.trim()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch results");

      setAttempts(data.results || []);
    } catch (err) {
      setError(err.message);
      setAttempts([]);
    } finally {
      setLoadingAttempts(false);
    }
  };

  const handleSearch = () => {
    fetchAttempts(searchText);
  };

  const handleClear = () => {
    setSearchText("");
    setFilterScore("all");
    setAttempts([]);
  };

  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      const percentage = Math.round((a.score / a.total) * 100);

      if (filterScore === "excellent") return percentage >= 90;
      if (filterScore === "good") return percentage >= 70 && percentage < 90;
      if (filterScore === "average") return percentage >= 50 && percentage < 70;
      if (filterScore === "poor") return percentage < 50;
      return true;
    });
  }, [attempts, filterScore]);

  const getScoreBadge = (percentage) =>
    percentage >= 90
      ? "badge-excellent"
      : percentage >= 70
      ? "badge-good"
      : percentage >= 50
      ? "badge-average"
      : "badge-poor";

  if (loading || loadingAttempts) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-2 text-gray-600">Loading quiz results...</span>
      </div>
    );
  }

  return (
    
    <div className="page-container">
      <h1 className="page-title">Track User Performance</h1>

      {/* Search & Filters */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <select
          value={filterScore}
          onChange={(e) => setFilterScore(e.target.value)}
          className="search-select"
        >
          <option value="all">All Scores</option>
          <option value="excellent">Excellent (90%+)</option>
          <option value="good">Good (70-89%)</option>
          <option value="average">Average (50-69%)</option>
          <option value="poor">Poor (&lt;50%)</option>
        </select>

        <div className="flex gap-2">
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
          <button onClick={handleClear} className="clear-button">
            Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 mb-4 rounded-lg">{error}</div>
      )}

      {/* Results Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Quiz Attempts ({filteredAttempts.length})</h2>
        </div>

        {filteredAttempts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {searchText ? "No quiz results found" : "Enter a name or email to search"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-head">
                <tr>
                  <th className="table-head-cell">Student</th>
                  <th className="table-head-cell">Quiz</th>
                  <th className="table-head-cell">Score</th>
                  <th className="table-head-cell">Percentage</th>
                  <th className="table-head-cell">Points</th>
                  <th className="table-head-cell">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttempts.map((a) => {
                  const percentage = Math.round((a.score / a.total) * 100);
                  return (
                    <tr key={a.id} className="table-row">
                      <td className="table-cell">
                        {`${a.firstName || ""} ${a.lastName || ""}`.trim()} <br />
                        <span className="text-gray-500 text-xs">{a.userEmail || "No email"}</span>
                      </td>
                      <td className="table-cell">{a.quizId}</td>
                      <td className="table-cell">{a.score}/{a.total}</td>
                      <td className="table-cell">
                        <span className={getScoreBadge(percentage)}>{percentage}%</span>
                      </td>
                      <td className="table-cell">{a.pointsEarned || 0}</td>
                      <td className="table-cell">{formatFirestoreDate(a.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
