export interface Doc {
  id: 0;
  organization: string;
  responsible_fullname: {
    id: 0;
    first_name: string;
    last_name: string;
    second_name: string;
  };
  doctype: string;
  edutype: string;
  finance: string;
  agent_fullname: {
    id: 0;
    first_name: string;
    last_name: string;
    second_name: string;
  };
  academy_fullname: {
    id: 0;
    first_name: string;
    last_name: string;
    second_name: string;
  };
  amount: number;
  status: string;
}
