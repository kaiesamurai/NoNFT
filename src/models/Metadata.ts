export interface Metadata {
  access: {
    approvals: any[]; // TODO set type
    owner: string;
  };
  info: {
    extension: null | any; // TODO set type
    token_uri: string;
  }
}
