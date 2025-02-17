import { Metadata } from "next";
import TreamentTypesPage from "@/components/treatment-types";


export const metadata: Metadata = {
  title: "Treatment-Types Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <TreamentTypesPage />
    </>
  );
};

export default CalendarPage;