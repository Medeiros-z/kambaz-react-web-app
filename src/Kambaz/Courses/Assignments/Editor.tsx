export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
                <option value="assignments">ASSIGNMENTS</option>
                <option value="exams">EXAMS</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
                <option value="percentage">Percentage</option>
                <option value="fraction">Fraction</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
                <option value="online">Online</option>
                <option value="in-person">In Person</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="center" valign="top" id="wd-text-entry">
            <p>Online Entry Options</p>
            <label><input type="checkbox" name="entry option" value="text" id="wd-text-entry"></input>Text Entry</label><br></br>
            <label><input type="checkbox" name="entry option" value="url" id="wd-website-url"></input>Website URL</label><br></br>
            <label><input type="checkbox" name="entry option" value="media" id="wd-media-recordings"></input>Media Recordings</label><br></br>
            <label><input type="checkbox" name="entry option" value="annotation" id="wd-student-annotation"></input>Student Annotation</label><br></br>
            <label><input type="checkbox" name="entry option" value="upload" id="wd-file-upload"></input>File Uploads</label><br></br>
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label><br></br>
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-due-date">Due Date</label><br></br>
            <input type="date" id="wd-due-date" />
          </td>
        </tr>

        <br></br>

        <tr>
          <td align="center" valign="top">
            <label htmlFor="wd-available-from">Available From</label><br></br>
            <input type="date" id="wd-available-from" />
          </td>
          <td align="center" valign="top">
            <label htmlFor="wd-available-until">Until</label><br></br>
            <input type="date" id="wd-available-until" />
          </td>
        </tr>
        
        

      </table>
    </div>
);}
