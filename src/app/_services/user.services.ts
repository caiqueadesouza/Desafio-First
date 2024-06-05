import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../_models/user.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: IUser[] = [];
    private userSubject = new BehaviorSubject<IUser[]>(this.users);

    constructor() {
        const novosUsuarios: IUser[] = [
            {
                id: '9a67dff7-3c38-4052-a335-0cef93438ff6',
                name: 'André',
                surname: 'Souza',
                phone: '123456789',
                email: 'john@example.com',
                profile: 'Admin',
                language: 'Inglês US',
                preferredContact: 'Phone',
                status: 'Ativo',
                created: '2020-10-10',
                access: '2020-10-10 13:00'
            },
            {
                id: 'a89672f5-e00d-4be4-9194-cb9d29f82165',
                name: 'Maria',
                surname: 'Luiza',
                phone: '987654321',
                email: 'maria@gmail.com',
                profile: 'Usuário',
                language: 'Português BR',
                preferredContact: 'Email',
                status: 'Pendente',
                created: '2021-01-15',
                access: '2021-01-15 14:30'
            }
        ];

        for (const usuario of novosUsuarios) {
            this.users.push(usuario);
        }

        this.userSubject.next(this.users);
    }

    store(user: IUser): boolean {
        user.id = uuidv4();
        user.status = 'Ativo';
        user.created = new Date().toISOString();

        this.users.push(user);
        this.userSubject.next([...this.users]);

        return true;
    }

    read(page: number, pageSize: number, searchTerm: string, statusFilter: string): Observable<{ users: IUser[], totalUsers: number }> {
        let filteredUsers = this.users;

        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
        }

        if (statusFilter) {
            filteredUsers = filteredUsers.filter(user => user.status.toLowerCase() === statusFilter);
        }

        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        const totalUsers = filteredUsers.length;

        return of({ users: paginatedUsers, totalUsers });
    }
}