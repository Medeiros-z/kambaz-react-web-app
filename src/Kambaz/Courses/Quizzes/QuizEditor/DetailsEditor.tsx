export default function DetailsTab({ quiz, setQuiz }: any) {
  const update = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  return (
    <div className="d-flex flex-column gap-3">

      {/* Title */}
      <div>
        <label className="fw-bold">Title</label>
        <input
          className="form-control"
          value={quiz.title || ""}
          onChange={(e) => update("title", e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="fw-bold">Description</label>
        <textarea
          className="form-control"
          rows={5}
          value={quiz.description || ""}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      {/* Quiz Type */}
      <div>
        <label className="fw-bold">Quiz Type</label>
        <select
          className="form-select"
          value={quiz.type || "Graded Quiz"}
          onChange={(e) => update("type", e.target.value)}
        >
          <option>Graded Quiz</option>
          <option>Practice Quiz</option>
          <option>Graded Survey</option>
          <option>Ungraded Survey</option>
        </select>
      </div>

      {/* Points */}
      <div>
        <label className="fw-bold">Points</label>
        <input
          type="number"
          className="form-control"
          value={quiz.points || 0}
          onChange={(e) => update("points", Number(e.target.value))}
        />
      </div>

      {/* Aassignment Group */}
      <div>
        <label className="fw-bold">Assignment Group</label>
        <select
          className="form-select"
          value={quiz.group || "Quizzes"}
          onChange={(e) => update("group", e.target.value)}
        >
          <option>Quizzes</option>
          <option>Exams</option>
          <option>Assignments</option>
          <option>Project</option>
        </select>
      </div>

      {/* Shuffle Answers */}
      <div>
        <label className="fw-bold me-2">Shuffle Answers</label>
        <select
          className="form-select w-auto d-inline-block"
          value={quiz.shuffle || "Yes"}
          onChange={(e) => update("shuffle", e.target.value)}
        >
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* Time Limit */}
      <div>
        <label className="fw-bold">Time Limit (Minutes)</label>
        <input
          type="number"
          className="form-control"
          value={quiz.timeLimit || 20}
          onChange={(e) => update("timeLimit", Number(e.target.value))}
        />
      </div>

      {/* Multiple Attempts flag */}
      <div>
        <label className="fw-bold me-2">Multiple Attempts</label>
        <select
          className="form-select w-auto d-inline-block"
          value={quiz.multipleAttempts || "No"}
          onChange={(e) => update("multipleAttempts", e.target.value)}
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      {/* Number of Attepts */}
      {quiz.multipleAttempts === "Yes" && (
        <div>
          <label className="fw-bold">How Many Attempts</label>
          <input
            type="number"
            className="form-control"
            value={quiz.attempts || 1}
            onChange={(e) => update("attempts", Number(e.target.value))}
          />
        </div>
      )}

      {/* Show correct answers */}
      <div>
        <label className="fw-bold">Show Correct Answers</label>
        <input
          className="form-control"
          value={quiz.showCorrect || ""}
          placeholder="e.g. After due date"
          onChange={(e) => update("showCorrect", e.target.value)}
        />
      </div>

      {/* Access Code */}
      <div>
        <label className="fw-bold">Access Code</label>
        <input
          className="form-control"
          value={quiz.accessCode || ""}
          onChange={(e) => update("accessCode", e.target.value)}
        />
      </div>

      {/* Yes/No Options */}
      {[
        ["One Question at a Time", "oneAtATime"],
        ["Webcam Required", "webcam"],
        ["Lock Questions After Answering", "lockQuestions"],
      ].map(([label, field]) => (
        <div key={field}>
          <label className="fw-bold me-2">{label}</label>
          <select
            className="form-select d-inline-block w-auto"
            value={quiz[field] || "No"}
            onChange={(e) => update(field, e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      ))}

      {/* Dates */}
      {["dueDate", "availableDate", "untilDate"].map((field) => (
        <div key={field}>
          <label className="fw-bold">
            {field.replace("Date", " Date").replace("available", "Available")}
          </label>
          <input
            type="date"
            className="form-control"
            value={quiz[field] || ""}
            onChange={(e) => update(field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
