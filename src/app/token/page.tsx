import TokenPage from "@/components/Token";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Token Page",
};

const CalendarPage = () => {
  return (
    <>
      <TokenPage />
    </>
  );
};

export default CalendarPage;