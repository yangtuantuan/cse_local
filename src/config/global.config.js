// 本地全局变量

export const DOMAON_NAME = "default";
export const PROJECT_ID = "default";

export const GOVERN_PREFIX = `/api/v4/${PROJECT_ID}/govern`;
export const CONFIG_CENTER_PREFIX = `/api/v1/${PROJECT_ID}/kie`;
export const REGISTRY_PREFIX = `/api/v4/${PROJECT_ID}/registry`;

export const envOptions = [
  {
    id: "",
    label: "<空>",
  },
  {
    id: "production",
    label: "production",
  },
  {
    id: "development",
    label: "development",
  },
  {
    id: "testing",
    label: "testing",
  },
  {
    id: "acceptance",
    label: "acceptance",
  },
];
