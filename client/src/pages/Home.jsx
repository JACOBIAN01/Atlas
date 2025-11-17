import { useState, useEffect } from "react";
import AskEmail from "../components/askEmail";
import GradeGroup from "../components/GradeGroup";
import ModuleSubmission from "../components/ModuleSubmission";
import { fetchGradeGroups } from "../api";
import KnowYourDev from "../components/KnowYourDev";

function Home() {
  const [teacherData, setTeacherData] = useState(null);
  const [gradeGroup, setGradeGroup] = useState(null);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    if (gradeOptions.length > 0) {
      return;
    }
    async function loadGroups() {
      const groups = await fetchGradeGroups();
      setGradeOptions(groups);
    }
    loadGroups();
  }, [gradeOptions.length]);

  return (
    <>
      <div className="absolute top-4 left-4">
        <KnowYourDev />
      </div>
      {!teacherData && <AskEmail setTeacherData={setTeacherData} />}
      {teacherData && !gradeGroup && gradeOptions.length > 0 && (
        <GradeGroup
          teacherData={teacherData}
          setGradeGroup={setGradeGroup}
          gradeOptions={gradeOptions}
        />
      )}

      {teacherData && gradeGroup && (
        <ModuleSubmission
          teacherData={teacherData}
          gradeGroup={gradeGroup}
          setTeacherData={setTeacherData}
          setGradeGroup={setGradeGroup}
        />
      )}
    </>
  );
}

export default Home;
