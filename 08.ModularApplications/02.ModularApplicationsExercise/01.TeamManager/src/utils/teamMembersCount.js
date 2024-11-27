export function mapTeamMembersCount(team, members) {
    if (!team.hasOwnProperty("members")) {
        team.members = 0;
    }

    const membersCount = members.filter(t => t.teamId === team._id).length;
    team.members = membersCount;
}