import { useState } from "react";
import AskEmail from "../components/askEmail";
import GradeGroup from "../components/GradeGroup";
import ModuleSubmission from "../components/ModuleSubmission";

function Home() {
  const [teacherData, setTeacherData] = useState(null);
  const [gradeGroup, setGradeGroup] = useState(null);
  return (
    <>
      {!teacherData && <AskEmail setTeacherData={setTeacherData} />}
      {teacherData && !gradeGroup && (
        <GradeGroup teacherData={teacherData} setGradeGroup={setGradeGroup} />
      )}

      {teacherData && gradeGroup && (
        <ModuleSubmission teacherData={teacherData} gradeGroup={gradeGroup} />
      )}
    </>
  );
}

export default Home;
