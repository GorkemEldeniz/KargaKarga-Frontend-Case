"use client";
import { useState } from "react";
import type { Board, Task } from "./type";

export default function Dashboard({ data }: { data: Board[] }) {
	const [test, setTest] = useState<Board[]>(data);

	const handleBoardDrag = (e: React.DragEvent, boardId: number) => {
		e.stopPropagation();
		e.dataTransfer.setData("board", `${boardId}`);
	};

	const handleBoardDrop = (e: React.DragEvent, boardId: number) => {
		const draggedBoardId = Number(e.dataTransfer.getData("board"));
		const draggedTaskId = Number(e.dataTransfer.getData("task"));

		if (!draggedBoardId || !boardId) return;

		if (draggedBoardId === boardId) return;

		const tempAr = [...test];

		const draggedBoard = tempAr.find((t) => t.id === draggedBoardId) as Board;

		const droppedBoard = tempAr.find((t) => t.id === boardId) as Board;

		if (draggedTaskId) {
			const tempDraggedBoardTasks = [...draggedBoard.tasks];
			const draggedIndex = tempDraggedBoardTasks.findIndex(
				(el) => el.id === draggedTaskId
			);
			const draggedTask = tempDraggedBoardTasks.splice(draggedIndex, 1)[0];
			console.log(tempDraggedBoardTasks);
			draggedTask.boardId = boardId;
			const droppedUpdatedTasks = [...droppedBoard.tasks, draggedTask];
			const modifiedAr = tempAr.map((t) => {
				if (t.id === boardId) {
					return { ...t, tasks: droppedUpdatedTasks };
				}
				if (t.id === draggedBoardId) {
					return { ...t, tasks: tempDraggedBoardTasks };
				}
				return t;
			});
			setTest(modifiedAr);
			e.dataTransfer.clearData("task");
		} else {
			const draggedBoardName = draggedBoard.name;
			const droppedBoardName = droppedBoard.name;

			draggedBoard.name = droppedBoardName;
			droppedBoard.name = draggedBoardName;

			tempAr.splice(draggedBoardId - 1, 1, droppedBoard);
			tempAr.splice(boardId - 1, 1, draggedBoard);

			const indexUpdatedArray = tempAr.map((t, index) => ({
				...t,
				tasks: t.tasks.map((a) => ({ ...a, boardId: boardId })),
				id: index + 1,
			}));

			setTest(indexUpdatedArray);
		}
		e.dataTransfer.clearData("board");
	};

	const handleTaskDrag = (e: React.DragEvent, taskId: number) => {
		e.dataTransfer.setData("task", `${taskId}`);
	};

	const handleTaskDrop = (
		e: React.DragEvent,
		droppedBoardId: number,
		droppedTAskId: number
	) => {
		return;
		const [draggedBoardId, draggedTaskId] = (
			e.dataTransfer.getData("task") as string
		)
			.split("-")
			.map(Number);

		const tempAr = [...test];

		const draggedBoardTasks = tempAr.find((t) => t.id === draggedBoardId)
			?.tasks as Task[];
		const droppedBoardTasks = tempAr.find((t) => t.id === droppedBoardId)
			?.tasks as Task[];

		const draggedBoardTask = tempAr.find((t) => t.id === draggedBoardId)?.tasks[
			draggedTaskId
		] as Task;
		const droppedBoardTask = tempAr.find((t) => t.id === droppedBoardId)?.tasks[
			droppedTAskId
		] as Task;

		draggedBoardTasks.splice(draggedBoardId - 1, 1, droppedBoardTask);
		droppedBoardTasks.splice(droppedBoardId - 1, 1, draggedBoardTask);

		const indexUpdatedDraggedTasks = draggedBoardTasks.map((t, index) => ({
			...t,
			id: index + 1,
		}));
		const indexUpdatedDroppedTasks = droppedBoardTasks.map((t, index) => ({
			...t,
			id: index + 1,
		}));

		const modifiedAr = tempAr.map((t, index) => {
			if (index === droppedBoardId) {
				return { ...t, tasks: indexUpdatedDroppedTasks };
			}
			if (index === draggedBoardId) {
				return { ...t, tasks: indexUpdatedDraggedTasks };
			}
			return t;
		});
		console.log(modifiedAr);
		//setTest(modifiedAr);
		e.dataTransfer.clearData("task");
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	return (
		<div className='grid grid-flow-col gap-2 overflow-x-scroll min-h-screen'>
			{test.map((board: Board) => (
				<div
					draggable
					onDragStart={(e) => handleBoardDrag(e, board.id)}
					onDrop={(e) => handleBoardDrop(e, board.id)}
					onDragOver={handleDragOver}
					className='min-w-[20rem] space-y-4 border'
					key={board.id}
				>
					<h1>{board.name}</h1>

					{board.tasks.map((task: Task, index: number) => (
						<div
							draggable
							onDrop={(e) => handleTaskDrop(e, task.boardId, index)}
							onDragStart={(e) => handleTaskDrag(e, task.id)}
							onDragOver={handleDragOver}
							key={index}
							className='border min-h-[100px]'
						>
							<h2>{task?.name}</h2>
							<p>{task?.description}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
