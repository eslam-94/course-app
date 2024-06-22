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
          <div id="copy-content" style={{width: '100%'}}>
            {children}
          </div>
        </hgroup>
      </main>
      <Sidebar/>
    </>
  );
}
