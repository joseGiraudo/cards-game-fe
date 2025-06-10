import React, { useEffect, useState } from 'react'
import type { User } from '../../models/user';
import * as userService from '../../services/userService';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

const UserList = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    // Handlers de paginación
    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 720 }}>
            <Table stickyHeader aria-label="user table">
            <TableHead>
                <TableRow>
                <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Username</TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="right" sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Role</TableCell>
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
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.username}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
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
        />
    </Paper>
  )
}

export default UserList