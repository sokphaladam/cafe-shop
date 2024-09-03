'use client';
import { ActionList, Icon, Popover } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import React, { useCallback, useState } from 'react';

export function PopoverEditControl(props: { id: number; onEdit: any }) {
  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open]);

  const activator = (
    <div
      className="cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center"
      onClick={toggelOpen}
    >
      <Icon source={MenuVerticalIcon} tone="base" />
    </div>
  );

  return (
    <Popover preferredPosition="mostSpace" activator={activator} active={open} onClose={toggelOpen}>
      <ActionList items={[{ content: 'Edit', onAction: () => props.onEdit(props.id) }]} />
    </Popover>
  );
}
