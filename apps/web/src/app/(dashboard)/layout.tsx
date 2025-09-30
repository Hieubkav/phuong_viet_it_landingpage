import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { Main } from "@/components/layout/main";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { MediaModalProvider } from "@/components/media/MediaModalProvider";
import { MediaTopbarActions } from "@/components/media/MediaTopbarActions";
import { MediaModalMount } from "@/components/media/MediaModalMount";


const dashboardLinks = [
  { title: "Tổng quan", href: "/dashboard" },
  { title: "Blocks trang chủ", href: "/dashboard/home-blocks" },
  { title: "Tạo block", href: "/dashboard/home-blocks/new" },
  { title: "Media", href: "/dashboard/media" },
];

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthenticatedLayout>
      <MediaModalProvider>
        <Header fixed>
          <TopNav links={dashboardLinks} />
          <div className="ms-auto flex flex-wrap items-center gap-2 sm:gap-3">
            <MediaTopbarActions />
            <Search />
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>{children}</Main>
        <MediaModalMount />
      </MediaModalProvider>
    </AuthenticatedLayout>
  );
}
