import { User } from "@/gql/graphql";
import { AppsIcon, ArchiveIcon, CartFilledIcon, MagicIcon } from "@shopify/polaris-icons";

export function MenuItems(user: User | null) {
  const defaultValue: any[] = [{
    title: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: AppsIcon,
        url: "/",
        items: [],
      },
    ],
  },
  {
    title: 'Inventory',
    items: [
      {
        label: "Products",
        icon: ArchiveIcon,
        url: '/products',
      },
      {
        label: "Categories",
        icon: MagicIcon,
        url: '/category'
      }
    ]
  },
  {
    title: 'Orders',
    items: [
      {
        label: "Point of sales",
        icon: CartFilledIcon,
        url: '/pos'
      }
    ]
  }];

  let MenuItem: any[] = [];

  if (user) {
    switch (user.role?.id) {
      case 1:
        MenuItem = [...defaultValue]
        break;
      case 2:
        MenuItem = [
          {
            title: 'Inventory',
            items: [
              {
                label: "Products",
                icon: ArchiveIcon,
                url: '/products',
              },
              {
                label: "Categories",
                icon: MagicIcon,
                url: '/category'
              }
            ]
          },
          {
            title: 'Orders',
            items: [
              {
                label: "Customer Order",
                icon: CartFilledIcon,
                url: '/orders/list'
              }
            ]
          }
        ]
        break;
      case 3:
        MenuItem = [
          {
            title: 'Orders',
            items: [
              {
                label: "Customer Order",
                icon: CartFilledIcon,
                url: '/orders/list'
              }
            ]
          }
        ]
        break;
      default:
        MenuItem = []
        break;
    }
  }

  return MenuItem;
}