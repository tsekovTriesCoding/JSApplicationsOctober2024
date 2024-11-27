import { api } from "../utils/requester.js"

const endpoints = {
    allTeams: "http://localhost:3030/data/teams",
    allMembers: "http://localhost:3030/data/members?where=status%3D%22member%22",
    allPendingMembers: "http://localhost:3030/data/members?where=status%3D%22pending%22",
    exactTeam: "http://localhost:3030/data/teams/",
    memberships: (teamId) => `http://localhost:3030/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
    requestMembership: "http://localhost:3030/data/members",
    membershipResponse: (id) => `http://localhost:3030/data/members/${id}`,
    allTeamsByMember: (id) => `http://localhost:3030/data/members?where=_ownerId%3D%22${id}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`,
}

async function getAllTeams() {
    return await api.get(endpoints.allTeams);
}

async function createTeam(data) {
    return await api.post(endpoints.allTeams, data);
}

async function updateTeam(id, data) {
    return await api.put(endpoints.exactTeam + id, data);
}

async function getAllMembers() {
    return await api.get(endpoints.allMembers);
}

async function getAllPendingMembers() {
    return await api.get(endpoints.allPendingMembers);
}

async function getTeam(teamId) {
    return await api.get(endpoints.exactTeam + teamId);
}

async function getMemberships(teamId) {
    return await api.get(endpoints.memberships(teamId));
}

async function requestMembership(data) {
    return await api.post(endpoints.requestMembership, data);
}

async function approveMembership(id, data) {
    return await api.put(endpoints.membershipResponse(id), data);
}

async function cancelRequestLeaveTeam(id) {
    return await api.del(endpoints.membershipResponse(id));
}

async function getAllTeamsByMemberId(id) {
    return await api.get(endpoints.allTeamsByMember(id));
}

export const dataService = {
    getAllTeams,
    createTeam,
    updateTeam,
    getAllMembers,
    getTeam,
    getMemberships,
    requestMembership,
    approveMembership,
    cancelRequestLeaveTeam,
    getAllPendingMembers,
    getAllTeamsByMemberId,
}