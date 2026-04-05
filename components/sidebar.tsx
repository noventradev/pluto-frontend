'use client';

import { cn } from '@/app/lib/utils';
import {
  BanknoteArrowUp,
  LayoutDashboard,
  PanelRightOpen,
  Wallet,
  Handshake,
  CreditCard,
  BarChart3,
  Settings,
  ContactRound,
  UserRoundPen,
} from 'lucide-react';
import { useState } from 'react';
import { SidebarItems } from './sidebar-items';
import { Button } from './ui/button';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`border-border overflow-y-auto border-r py-6 pt-5 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4">
        {!isCollapsed && <p className="text-xl font-bold">Pluto</p>}
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <PanelRightOpen
            className={`hover:text-foreground text-muted size-5 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </Button>
      </div>

      <hr className="my-4 border-transparent" />

      <ul className="space-y-6 px-2">
        {/* MAIN */}
        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            Main
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard"
              pathName="Dashboard"
              icon={<LayoutDashboard />}
              collapsed={isCollapsed}
            />

            <SidebarItems
              path="/dashboard/deals"
              pathName="Deals"
              icon={<Handshake />}
              collapsed={isCollapsed}
            />

            <SidebarItems
              path="/dashboard/payments"
              pathName="Payments"
              icon={<CreditCard />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>

        {/* FINANCE */}
        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            Finance
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard/income"
              pathName="Income"
              icon={<BanknoteArrowUp />}
              collapsed={isCollapsed}
            />

            <SidebarItems
              path="/dashboard/expense"
              pathName="Expense"
              icon={<Wallet />}
              collapsed={isCollapsed}
            />

            <SidebarItems
              path="/dashboard/analytics"
              pathName="Analytics"
              icon={<BarChart3 />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>
        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            Organization
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard/members"
              pathName="Members"
              icon={<ContactRound />}
              collapsed={isCollapsed}
            />
            <SidebarItems
              path="/dashboard/permissions"
              pathName="Permissions"
              icon={<UserRoundPen />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>
        {/* SYSTEM */}
        <li>
          <p
            className={cn(
              'overflow-hidden px-2 text-sm font-semibold transition-all duration-200',
              isCollapsed
                ? 'mb-0 max-h-0 opacity-0'
                : 'mb-2 max-h-10 opacity-100'
            )}
          >
            System
          </p>

          <ul className="space-y-1">
            <SidebarItems
              path="/dashboard/settings"
              pathName="Settings"
              icon={<Settings />}
              collapsed={isCollapsed}
            />
          </ul>
        </li>
      </ul>
    </aside>
  );
};
