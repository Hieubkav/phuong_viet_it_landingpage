import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { Main } from "@/components/layout/main";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";

const dashboardLinks = [
  { title: "Tổng quan", href: "/dashboard" },
  { title: "Blocks trang chủ", href: "/dashboard/home-blocks" },
  { title: "Tạo block", href: "/dashboard/home-blocks/new" },
];

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedLayout>
      <Header fixed>
        <TopNav links={dashboardLinks} />
        <div className="ms-auto flex flex-nowrap items-center space-x-2 sm:space-x-3">
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>{children}</Main>
    </AuthenticatedLayout>
  );
}
