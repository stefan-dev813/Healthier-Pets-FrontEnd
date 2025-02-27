import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Token",
        icon: Icons.User,
        url: "/token",
        items: [],
      },
      {
        title: "Treatment Types",
        icon: Icons.Table,
        url: "/treatment-types",
        items: [],
      },
      {
        title: "Pet Parents",
        icon: Icons.Table,
        url: "/pet-parents",
        items: [],
      },
      {
        title: "Pets",
        icon: Icons.Table,
        url: "/pets",
        items: [
          {
            title: "Clinic - 496",
            url: "/pets/496",
          },
          {
            title: 'Clinic - 497',
            url: "/pets/497"
          }
        ]
      }
    ],
  },
];
