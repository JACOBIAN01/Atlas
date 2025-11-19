import { useState, useEffect } from "react";
import AskEmail from "../components/askEmail";
import GradeGroup from "../components/GradeGroup";
import ModuleSubmission from "../components/ModuleSubmission";
import { fetchGradeGroups } from "../api";
import KnowYourDev from "../components/KnowYourDev";
import MadeByBadge from "../components/MadeByBadge";
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
      {/* Developer Badge */}
      <div className="absolute top-4 left-4 z-20">
        <KnowYourDev />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* STEP 1 */}
        {!teacherData && <AskEmail setTeacherData={setTeacherData} />}

        {/* STEP 2 */}
        {teacherData && !gradeGroup && (
          <>
            {loadingGroups ? (
              <div className="flex justify-center items-center">
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

        {/* STEP 3 */}
        {teacherData && gradeGroup && (
          <ModuleSubmission
            teacherData={teacherData}
            gradeGroup={gradeGroup}
            setTeacherData={setTeacherData}
            setGradeGroup={setGradeGroup}
          />
        )}
      </div>
      <MadeByBadge/>
    </>
  );
}

export default Home;
