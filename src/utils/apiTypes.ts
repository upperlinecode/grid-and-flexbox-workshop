export interface LoginBody {
  username: string;
  password: string;
}

export interface SignUpBody {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface CreateBoardBody {
  title: string;
}

export interface UpdateBoardBody extends Partial<CreateBoardBody> {}

export interface CreateColumnBody {
  title: string;
  boardId: number;
}

export interface UpdateColumnBody extends Partial<CreateColumnBody> {
  previousColumnId?: number | null;
  nextColumnId?: number | null;
}

export interface CreateCardBody {
  title: string;
  description?: string;
  columnId: number;
}

export interface UpdateCardBody extends Partial<CreateCardBody> {
  previousCardId?: number | null;
  nextCardId?: number | null;
}

export interface Card {
  id: number;
  title: string;
  description: string | null;
  columnId: number;
}

export interface Column {
  id: number;
  title: string;
  boardId: number;
}

export interface Board {
  id: number;
  title: string;
}
