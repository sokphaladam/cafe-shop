'use client';

import { User } from '@/gql/graphql';
import { ActionList, Avatar, Icon, IndexTable, Popover } from '@shopify/polaris';
import { MenuVerticalIcon } from '@shopify/polaris-icons';
import { useCallback, useState } from 'react';

export function UserListItem({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);

  const toggelOpen = useCallback(() => setOpen(!open), [open]);

  return (
    <IndexTable.Row key={user?.id} id={user?.id + ''} position={user?.id || 0}>
      <IndexTable.Cell>
        <small>{user?.id}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Avatar
          source={user?.profile || ''}
          initials={user?.display
            ?.split(' ')
            .map((s) => s.charAt(0).toUpperCase())
            .join('')}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.display}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.gender}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.dob}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.contact}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.startingAt}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.position}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>
          {user?.role?.name} ({user?.type ?? 'SYS'})
        </small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <small>{user?.isActive ? 'Yes' : 'No'}</small>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {user?.type === 'STAFF' && (
          <Popover
            activator={
              <div
                className="cursor-pointer hover:bg-gray-300 rounded-full w-[30px] h-[30px] flex flex-row items-center"
                onClick={toggelOpen}
              >
                <Icon source={MenuVerticalIcon} tone="base" />
              </div>
            }
            active={open}
            onClose={toggelOpen}
          >
            <ActionList items={[{ content: 'Edit', url: `/staff/edit/${user?.id}` }]} />
          </Popover>
        )}
      </IndexTable.Cell>
    </IndexTable.Row>
  );
}
