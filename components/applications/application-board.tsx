"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import type { Application, ApplicationStatusLabel } from "@/lib/types";
import ApplicationBoardColumn from "@/components/applications/application-board-column";
import { updateApplicationStatus } from "@/lib/actions/applications";
import { applicationStatusLabelToValue } from "@/lib/application-status";

type StatusColumn = {
    label: ApplicationStatusLabel;
    description: string;
    tone: string;
};

type ApplicationBoardProps = {
    applications: Application[];
    statusColumns: StatusColumn[];
};

export default function ApplicationBoard({ applications, statusColumns }: ApplicationBoardProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [liveMessage, setLiveMessage] = useState("");
    const [optimisticApplications, setOptimisticStatus] = useOptimistic(
        applications,
        (state, patch: { id: string; status: ApplicationStatusLabel }) =>
            state.map((application) =>
                application.id === patch.id
                    ? { ...application, status: patch.status }
                    : application,
            ),
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor),
    );

    function handleMove(id: string, newStatus: ApplicationStatusLabel) {
        const application = optimisticApplications.find((item) => item.id === id);
        if (!application || application.status === newStatus) {
            return;
        }

        startTransition(async () => {
            setOptimisticStatus({ id, status: newStatus });
            try {
                await updateApplicationStatus(id, applicationStatusLabelToValue(newStatus));
                setLiveMessage(
                    `Moved ${application.role} at ${application.company} to ${newStatus}.`,
                );
                router.refresh();
            } catch {
                setLiveMessage(
                    `Could not move ${application.role} at ${application.company} to ${newStatus}. Please try again.`,
                );
            }
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const newStatus = event.over?.id as ApplicationStatusLabel | undefined;
        if (!newStatus) {
            return;
        }
        handleMove(event.active.id as string, newStatus);
    }

    return (
        <DndContext
            id="application-board"
            sensors={sensors}
            onDragEnd={handleDragEnd}
            accessibility={{
                announcements: {
                    onDragStart({ active }) {
                        const application = optimisticApplications.find(
                            (item) => item.id === active.id,
                        );
                        return application
                            ? `Picked up ${application.role} at ${application.company}, currently in ${application.status}.`
                            : "Picked up card.";
                    },
                    onDragOver({ active, over }) {
                        const application = optimisticApplications.find(
                            (item) => item.id === active.id,
                        );
                        if (!application || !over) {
                            return "Card is no longer over a droppable column.";
                        }
                        return `${application.role} is over the ${over.id} column.`;
                    },
                    onDragEnd({ active, over }) {
                        const application = optimisticApplications.find(
                            (item) => item.id === active.id,
                        );
                        if (!application) {
                            return "Card was dropped.";
                        }
                        return over
                            ? `${application.role} was moved to ${over.id}.`
                            : `${application.role} was returned to its original column.`;
                    },
                    onDragCancel({ active }) {
                        const application = optimisticApplications.find(
                            (item) => item.id === active.id,
                        );
                        return application
                            ? `Moving ${application.role} was cancelled.`
                            : "Move cancelled.";
                    },
                },
            }}
        >
            <div className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 xl:grid-flow-row xl:grid-cols-5 xl:overflow-visible">
                {statusColumns.map((column) => (
                    <ApplicationBoardColumn
                        key={column.label}
                        applications={optimisticApplications.filter(
                            (application) => application.status === column.label,
                        )}
                        description={column.description}
                        label={column.label}
                        tone={column.tone}
                        onStatusChange={handleMove}
                    />
                ))}
            </div>
            <div aria-live="polite" className="sr-only">
                {liveMessage}
            </div>
        </DndContext>
    );
}
