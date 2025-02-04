import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const TabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const TabItemWrapper = styled.div`
  padding: 12px 8px;
  position: relative;
  cursor: pointer;
`;

const TabTextWrapper = styled.div`
  color: ${({ color }) => color || "var(--grey-100)"};
  font-style: var(--font-style-normal);
  font-weight: var(--font-weight-500);
  font-size: var(--body-s);
  line-height: var(--line-height-24);
  letter-spacing: var(--jds-letter-spacing-5);

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  // max-width: 200px;
`;

const TabText = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const TabCount = styled.p`
  border-radius: 4px;
  background: #f1f5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  margin: 0;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.06px;

  ${({ isActive }) =>
    css`
      background-color: ${isActive ? "#f1f5ff" : "#F5F5F5"};
    `};
`;

const ActiveNavIndicator = styled.div`
  border-radius: 25px;
  position: absolute;
  height: 4px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: black;
`;

const TabItem = ({ item, isActive, handleTabClick, ...restProps }) => {
  let { label, count } = item;
  let { hideInactiveCount = false, color, bg } = restProps;

  return (
    <TabItemWrapper
      data-testid={item?.key}
      isActive={isActive}
      onClick={() => handleTabClick(item)}
      id={"tab-" + item.key}
    >
      <TabTextWrapper color={color}>
        <TabText>{label}</TabText>
        {count !== undefined && (
          <>
            {(!hideInactiveCount || isActive) &&
              (count === 0 ? (
                <TabCount isActive={isActive}>0</TabCount>
              ) : (
                <TabCount isActive={isActive}>{count}</TabCount>
              ))}
          </>
        )}
      </TabTextWrapper>
      {isActive && (
        <ActiveNavIndicator data-testid={`${item?.key}-active`} bg={bg} />
      )}
    </TabItemWrapper>
  );
};

export default function Tabs({ selectedTab, tabList, onClick, ...restProps }) {
  const handleTabClick = (tab) => {
    onClick(tab.key);
  };

  useEffect(() => {
    if (selectedTab) {
      let tab = document.querySelector(`#tab-${selectedTab}`);

      tab.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [selectedTab]);

  return (
    <TabsWrapper className="oS hideScrollBar" data-testid="tabs-component">
      {tabList &&
        tabList?.map((tabItem, idx) => (
          <TabItem
            key={tabItem?.key + "_tab"}
            item={tabItem}
            isActive={selectedTab === tabItem?.key}
            handleTabClick={handleTabClick}
            {...restProps}
          />
        ))}
    </TabsWrapper>
  );
}
