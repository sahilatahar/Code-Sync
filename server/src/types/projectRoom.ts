export interface IProjectRoomDTO {
  _id: string;
  name: string;
  owner: string;
  members: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}
