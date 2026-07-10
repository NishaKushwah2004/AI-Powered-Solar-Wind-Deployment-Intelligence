import { sidebarItems } from "@/config/navigation/sidebarItems";

import SidebarItems from "./SidebarItems";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">

      <div className="border-b p-6">

        <h1 className="text-xl font-bold text-primary">
          Solar & Wind
        </h1>

      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto p-5">

        {sidebarItems.map((section) => (
          <div key={section.title}>

            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">

              {section.title}

            </h2>

            <div className="space-y-1">

              {section.items.map((item) => (
                <SidebarItems
                  key={item.title}
                  item={item}
                />
              ))}

            </div>

          </div>
        ))}

      </nav>

    </aside>
  );
}