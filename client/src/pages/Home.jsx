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
  const [loadingGroups, setLoadingGroups] = useState(true);
  // Load grade groups in background

  useEffect(() => {
    async function loadGroups() {
      setLoadingGroups(true);

      let retries = 3;
      let groups = [];

      while (retries > 0) {
        try {
          const result = await fetchGradeGroups();
          if (Array.isArray(result) && result.length > 0) {
            groups = result;
            break;
          }
        } catch (err) {
          console.warn("Error fetching grade groups:", err);
        }
        retries--;
        await new Promise((r) => setTimeout(r, 600));
      }

      setGradeOptions(groups);
      setLoadingGroups(false);
    }
    if (gradeOptions.length === 0) {
      loadGroups();
    }
  }, [gradeOptions.length]);

  return (
    <>
      <div className="absolute top-4 left-4">
        <KnowYourDev />
      </div>

      {/* Step 1 — AskEmail ALWAYS shows first */}
      {!teacherData && <AskEmail setTeacherData={setTeacherData} />}

      {/* Step 2 — Only after email, show GradeGroup OR its loader */}
      {teacherData && !gradeGroup && (
        <>
          {loadingGroups ? (
            // Loader ONLY for GradeGroup
            <div className="min-h-screen flex justify-center items-center bg-[#FFECEC]">
              <div className="animate-spin h-12 w-12 rounded-full border-4 border-gray-300 border-t-[#FF5C39]"></div>
            </div>
          ) : (
            <GradeGroup
              teacherData={teacherData}
              setGradeGroup={setGradeGroup}
              gradeOptions={gradeOptions}
            />
          )}
        </>
      )}

      {/* Step 3 — Submission */}
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
