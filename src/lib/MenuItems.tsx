import { User } from '@/gql/graphql';
import { useScriptLanguage } from '@/service/LanguageProvider';
import {
  AppsIcon,
  ArchiveIcon,
  CartFilledIcon,
  DeliveryIcon,
  MagicIcon,
  SettingsFilledIcon,
  SettingsIcon,
  TabletIcon,
} from '@shopify/polaris-icons';

export function MenuItems(user: User | null) {
  const lng = useScriptLanguage();

  const defaultValue: any[] = [
    {
      title: lng.menu_dashboard,
      items: [
        {
          label: lng.menu_dashboard,
          icon: AppsIcon,
          url: '/',
          items: [],
        },
      ],
    },
    {
      title: 'Inventory',
      items: [
        {
          label: lng.menu_product,
          icon: ArchiveIcon,
          url: '/products',
        },
        {
          label: lng.menu_category,
          icon: MagicIcon,
          url: '/category',
        },
      ],
    },
    {
      title: 'Orders',
      items: [
        {
          label: 'Customer Order',
          icon: CartFilledIcon,
          url: '/orders/list',
        },
      ],
    },
    {
      title: 'Setting',
      items: [
        {
          label: 'Option',
          icon: SettingsIcon,
          url: '/setting',
        },
        {
          label: 'Table',
          icon: TabletIcon,
          url: '/setting/set',
        },
        {
          label: 'Delivery',
          icon: DeliveryIcon,
          url: '/setting/delivery',
        },
      ],
    },
  ];

  let MenuItem: any[] = [];

  if (user) {
    switch (user.role?.id) {
      case 1:
        MenuItem = [...defaultValue];
        break;
      case 2:
        MenuItem = [
          {
            title: 'Inventory',
            items: [
              {
                label: 'Products',
                icon: ArchiveIcon,
                url: '/products',
              },
              {
                label: 'Categories',
                icon: MagicIcon,
                url: '/category',
              },
            ],
          },
          {
            title: 'Orders',
            items: [
              {
                label: 'Order',
                icon: CartFilledIcon,
                url: '/order/list',
              },
            ],
          },
          {
            title: 'Setting',
            items: [
              {
                label: 'Option',
                icon: SettingsIcon,
                url: '/setting',
              },
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/setting/set',
              },
              {
                label: 'Delivery',
                icon: DeliveryIcon,
                url: '/setting/delivery',
              },
            ],
          },
        ];
        break;
      case 3:
        MenuItem = [
          {
            title: 'Orders',
            items: [
              {
                label: 'Order',
                icon: CartFilledIcon,
                url: '/order/list',
              },
            ],
          },
          {
            title: 'Setting',
            items: [
              {
                label: 'Table',
                icon: TabletIcon,
                url: '/setting/set',
              },
              {
                label: 'Delivery',
                icon: DeliveryIcon,
                url: '/setting/delivery',
              },
            ],
          },
        ];
        break;
      case 4:
        MenuItem = [
          {
            title: 'Kitchen',
            items: [
              {
                label: 'Today Order',
                icon: CartFilledIcon,
                url: '/kitchen/order',
              },
            ],
          },
        ];
        break;
      default:
        MenuItem = [];
        break;
    }
  }

  return MenuItem;
}
