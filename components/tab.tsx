/** @jsxImportSource @emotion/react */
import { TabContainerStyled, TabStyled } from "@/styles/styled";
import { ButtonHTMLAttributes } from "react";

interface ITabProps {
  activeTab: number;
  onClick: (e: any) => void;
  tabs: string[];
}

export interface ITabStyledProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}

const Tabs = ({ activeTab, onClick, tabs }: ITabProps) => {
  return (
    <TabContainerStyled>
      {tabs.map((tabName, id: number) => (
        <TabStyled
          key={tabName}
          isActive={activeTab === id}
          onClick={() => onClick(id)}
        >
          {tabName.charAt(0).toUpperCase() + tabName.slice(1)}{" "}
        </TabStyled>
      ))}
    </TabContainerStyled>
  );
};

export default Tabs;
