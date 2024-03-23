type Task = {
	id: number;
	createdUserId: number;
	name: string;
	description?: string;
	code: number;
	boardId: number;
	flagId: number;
	order: number;
	startDate?: string;
	endDate?: string;
	createdAt: string;
	updatedAt: string;
	deletedAt?: string;
	deletedUserId?: number;
};

type Board = {
	id: number;
	name: string;
	openAction: boolean;
	completeAction: boolean;
	order: number;
	createdAt: string;
	updatedAt: string;
	deletedAt?: null;
	tasks: Task[];
};

export type { Board, Task };
