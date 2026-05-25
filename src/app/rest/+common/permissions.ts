export interface PermissionTree {
  modules: PermissionTreeModule[];
}

export interface PermissionTreeModule {
  name: string;
  fullName: string;
  children: PermissionTreeFeature[];
}

export interface PermissionTreeFeature {
  name: string;
  fullName: string;
  children: PermissionTreePermission[];
}

export interface PermissionTreePermission {
  name: string;
  fullName: string;
  selected: boolean;
}
