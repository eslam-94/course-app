import Logout from "../ui/logout";
import Sidebar from "../ui/sidebar";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Logout/>
      <main className="container">
        <hgroup>
          <div>
            {children}
          </div>
        </hgroup>
      </main>
      <Sidebar/>
    </>
  );
}
