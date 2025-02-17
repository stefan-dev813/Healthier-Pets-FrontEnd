import TokenPage from "@/components/Token";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Page",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>

      <TokenPage />
    </>
  );
};

export default CalendarPage;