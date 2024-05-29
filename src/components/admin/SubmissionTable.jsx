import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const students = [
  {
    id: 1,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 2,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 3,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 4,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 5,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 6,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 7,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 8,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 9,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 10,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 11,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 12,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 13,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 14,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 15,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 16,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 17,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 18,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 19,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 20,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 21,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 22,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 23,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 24,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 25,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 26,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 27,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 28,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 29,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 30,
    student: "Erica Mendez",
    assignmentsSubmitted: [1, 2],
  },
  {
    id: 31,
    student: "Olivia Carolina Gonzalez",
    assignmentsSubmitted: [1, 2, 3, 5],
  },
  {
    id: 32,
    student: "Quisqueya La Bella",
    assignmentsSubmitted: [1, 4],
  },
  {
    id: 33,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
  {
    id: 34,
    student: "Hayao Miyazaki",
    assignmentsSubmitted: [2],
  },
];

const assignments = [
  {
    id: 1,
    name: "Calculator",
  },
  {
    id: 2,
    name: "Fizzbuzz",
  },
  {
    id: 3,
    name: "test",
  },
  {
    id: 4,
    name: "test",
  },
  {
    id: 5,
    name: "test",
  },
  {
    id: 6,
    name: "test",
  },
  {
    id: 7,
    name: "test",
  },
  {
    id: 8,
    name: "test",
  },
  {
    id: 9,
    name: "test",
  },
  {
    id: 10,
    name: "test",
  },
  {
    id: 11,
    name: "test",
  },
  {
    id: 12,
    name: "test",
  },
  {
    id: 13,
    name: "test",
  },
  {
    id: 14,
    name: "test",
  },
  {
    id: 15,
    name: "test",
  },
  {
    id: 16,
    name: "test",
  },
  {
    id: 17,
    name: "test",
  },
  {
    id: 18,
    name: "test",
  },
];

{
  /* <FontAwesomeIcon icon={faSquareCheck}> */
}

const SubmissionTable = ({ submissions }) => {
  return (
    <div className="tableDiv">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            {assignments.map((assignment) => (
              <th key={assignment.id}>{assignment.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* map through students */}
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.student}</td>
              {assignments.map((assignment) => (
                <td key={assignment.id}>
                  {student.assignmentsSubmitted.includes(assignment.id) ? (
                    <FontAwesomeIcon icon={faSquareCheck} />
                  ) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
