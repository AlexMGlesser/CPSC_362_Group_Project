import React from "react";

function MyGamesPanel() {
  return (
    // 'card-library' tells the CSS Grid to span this component across the full width
    // when the screen is wide enough (defined in your CSS media query).
    <div className="card card-library">
      <div className="panel">
        <h2 className="panel-title">My Games</h2>
        <p className="panel-text">
          Your complete Steam library will appear here.
        </p>

        {/* Placeholder for future grid/list of games */}
        <div
          style={{
            height: "150px",
            border: "1px dashed var(--border-subtle)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-muted)",
            fontSize: "0.9rem",
            background: "rgba(0,0,0,0.2)",
          }}
        >
          No games loaded yet.
        </div>
      </div>
    </div>
  );
}

export default MyGamesPanel;