import { useState } from "react";
import AskEmail from "../component/askEmail";
import GradeGroup from "../component/GradeGroup";
import ModuleSubmission from "../component/ModuleSub";

export default function Home() {
  const [showGradeGroup, setShowGradeGroup] = useState(false);
  const [showModule, setShowModule] = useState(false);
  const [gradeGroup, setGradeGroup] = useState("");
  const [teacher,setTeacher] = useState();

  const handleGradeGroup = () => {
    console.log(gradeGroup);
    setShowModule(true);
  };

  return (
    <div>
      {showModule ? (
        <ModuleSubmission teacher={teacher} gradeGroup={gradeGroup} />
      ) : showGradeGroup ? (
        <GradeGroup
          gradeGroup={gradeGroup}
          setGradeGroup={setGradeGroup}
          onContinue={handleGradeGroup}
        />
      ) : (
        <AskEmail teacher={teacher} setTeacher={setTeacher} onContinue={() => setShowGradeGroup(true)} />
      )}
    </div>
  );
}
