import { useState } from "react";

import useProjects from "../../hooks/useProjects";

import DataTable from "../../components/common/DataTable";
import LoadingState from "../../components/common/LoadingState";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";

import ProjectRow from "../../components/project/ProjectRow";
import ProjectForm from "../../components/project/ProjectForm";

import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";

export default function Projects() {

    const {
        projects,
        loading,
        createProject,
        updateProject,
        deleteProject,
    } = useProjects();

    // Create Modal
    const [createOpen, setCreateOpen] = useState(false);

    // Edit Modal
    const [editOpen, setEditOpen] = useState(false);

    // Delete Modal
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Selected Project
    const [selectedProject, setSelectedProject] = useState(null);

    // ---------------- CREATE ----------------

    async function handleCreateProject(data) {

        const success = await createProject(data);

        if (success) {
            setCreateOpen(false);
        }

    }

    // ---------------- EDIT ----------------

    function handleEdit(project) {

        setSelectedProject(project);

        setEditOpen(true);

    }

    async function handleUpdateProject(data) {

        const success = await updateProject(
            selectedProject.id,
            data,
        );

        if (success) {

            setEditOpen(false);

            setSelectedProject(null);

        }

    }

    // ---------------- DELETE ----------------

    function handleDelete(project) {

        setSelectedProject(project);

        setDeleteOpen(true);

    }

    async function confirmDelete() {

        const success = await deleteProject(
            selectedProject.id,
        );

        if (success) {

            setDeleteOpen(false);

            setSelectedProject(null);

        }

    }

    // ---------------- VIEW ----------------

    function handleView(project) {

        console.log("View Project:", project);

        // Next phase:
        // navigate(`/projects/${project.id}`);

    }

    if (loading) {

        return <LoadingState />;

    }

    return (

        <div>

            {/* Header */}

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold">

                    Projects

                </h1>

                <Button
                    onClick={() => setCreateOpen(true)}
                >
                    + Create Project
                </Button>

            </div>

            {/* Table */}

            <DataTable

                columns={[
                    "Project",
                    "Region",
                    "Description",
                    "Actions",
                ]}

                data={projects}

                renderRow={(project) => (

                    <ProjectRow
                        key={project.id}
                        project={project}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                )}

            />

            {/* Create Modal */}

            <Modal
                title="Create Project"
                isOpen={createOpen}
                onClose={() => setCreateOpen(false)}
            >

                <ProjectForm
                    onSubmit={handleCreateProject}
                />

            </Modal>

            {/* Edit Modal */}

            <Modal
                title="Edit Project"
                isOpen={editOpen}
                onClose={() => {

                    setEditOpen(false);

                    setSelectedProject(null);

                }}
            >

                <ProjectForm
                    initialData={selectedProject}
                    onSubmit={handleUpdateProject}
                />

            </Modal>

            {/* Delete Confirmation */}

            <DeleteConfirmationModal

                isOpen={deleteOpen}

                title="Delete Project"

                message={`Are you sure you want to delete "${selectedProject?.name}"?`}

                onCancel={() => {

                    setDeleteOpen(false);

                    setSelectedProject(null);

                }}

                onConfirm={confirmDelete}

            />

        </div>

    );

}