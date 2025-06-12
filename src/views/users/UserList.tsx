import React, { useEffect, useState } from 'react'
import type { User } from '../../models/user';
import * as userService from '../../services/userService';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

import { Delete, Edit, Visibility, PersonAdd } from '@mui/icons-material';
import UserFormDialog from '../../components/user/UserFormDialog';
import ConfirmDialog from '../../components/ConfirmDialog';


type DialogMode = 'confirm' | 'success' | 'alert' | 'error';

interface ConfirmDialogState {
  open: boolean;
  mode: DialogMode;
  title: string;
  onSuccess?: () => void;
}



const UserList = () => {

    // useState para la tabla
    const [users, setUsers] = useState<User[]>([]);

    // useState para el Dialog con el form
    const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view">("create");
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);



    const [dialogProps, setDialogProps] = useState<ConfirmDialogState>({
        open: false,
        mode: 'alert',
        title: '',
    });

    // useState de paginacion
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // obtener usuarios para la tavbla
    const fetchUsers = async () => {
        try {
            const data = await userService.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {    
        fetchUsers();
    }, [])


    // HANDLERS DE USUARIOS
    const handleViewUser = (user: User) => {
        setSelectedUser(user);
        setDialogMode('view');
        setOpenUserDialog(true);
    };

    const handleAddUser = () => {
        setSelectedUser(null);
        setDialogMode('create');
        setOpenUserDialog(true);
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setDialogMode('edit');
        setOpenUserDialog(true);
    };

    const handleDeleteUser = async (id: number) => {
        setUserIdToDelete(id);
        openConfirmDialog(
            'confirm', '¿Eliminar Usuario?', deleteUser)
    };

    const deleteUser = async () => {
        if(userIdToDelete) {
            try {
                await userService.deleteUser(userIdToDelete);
                fetchUsers();
            } catch (error) {
                console.error('Error eliminando usuario:', error);
                openConfirmDialog('error', 'Error eliminando el usuario');
            } finally {
                setUserIdToDelete(null);
            }
        }
    }

    const translateUserRole = (role: number) => {
        switch(role) {
            case 1:
                return 'Administrador';
            case 2:
                return 'Organizador';
            case 3:
                return 'Juez';
            case 4:
                return 'Jugador';
            default:
                return 'Rol no admitido'
        }
    }

    // metodo para abrir el dialog de confirmacion
    const openConfirmDialog = (mode: DialogMode, title: string, onSuccess?: () => void ) => {
        setDialogProps({
            open: true,
            mode,
            title,
            onSuccess,
        });
    };
    const closeConfirmDialog = () => {
        setDialogProps((prev) => ({ ...prev, open: false }));
    };



    // Handlers de paginación
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


  return (
    <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 720 }}>
                <Table stickyHeader aria-label="user table">
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell align="left" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell align="left" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                        <TableCell align="left" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                        <TableCell align="left" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Rol</TableCell>
                        <TableCell align="center" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Acciones
                            <Button
                                onClick={handleAddUser}
                                variant="contained"
                                startIcon={<PersonAdd />}
                                sx={{ border: 1}}
                            >
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                        <TableRow key={user.id} hover>
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="left">{user.name}</TableCell>
                            <TableCell align="left">{user.username}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{translateUserRole(user.role)}</TableCell>
                            <TableCell align="left">
                                <IconButton color="primary" onClick={() => handleViewUser(user)}>
                                    <Visibility />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => handleEditUser(user)}>
                                    <Edit />
                                </IconButton>
                                {user.id !== 1 && (
                                    <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
                                        <Delete />
                                    </IconButton>
                                ) }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Usuarios por página"
            />
        </Paper>
        

        
        <UserFormDialog
            open= {openUserDialog}
            mode= {dialogMode}
            onClose= {() => setOpenUserDialog(false)}
            onSuccess= {fetchUsers}
            userToEdit= {selectedUser}
        />

        
        <ConfirmDialog
            open= {dialogProps.open}
            mode={dialogProps.mode}
            title={dialogProps.title}
            onClose={closeConfirmDialog}
            onSuccess={() => {
                dialogProps.onSuccess?.();
                closeConfirmDialog();
            }}
        />
        

    </>
  )
}

export default UserList