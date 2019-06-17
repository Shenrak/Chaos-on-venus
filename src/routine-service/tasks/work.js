
const getWorkForce = (worker, infrastructure) => {
  const skill = worker.skills.find(s => s.workType === infrastructure.workType)
  const workForce = skill ? skill.efficiency : 1
  return workForce
}

module.exports.work = (worker, infrastructures, workForcesToAdd) => {
  const infrastructure = infrastructures.find(
    i => i.id === worker.assignedInfrastructure
  )

  if (!infrastructure) {
    throw new Error("infrastructure not found")
  }

  const workForce = getWorkForce(worker, infrastructure)
  

  if (
    !workForcesToAdd.find(w => w.infrastructureId === infrastructure.id)
  ) {
    workForcesToAdd.push({
      infrastructureId: infrastructure.id,
      workForce: 0
    })
  }
  workForcesToAdd.find(
    w => w.infrastructureId === infrastructure.id
  ).workForce += workForce
}