const path = require("path");
const fs = require('fs');
const { init } = require('z3-solver');

const input = fs.readFileSync(path.resolve(__dirname, "../input.txt")).toString().split('\r\n');

function parseHailstone(line) {
    const [pos, vel] = line.split(' @ ');
    const [px, py, pz] = pos.split(', ').map(Number);
    const [vx, vy, vz] = vel.split(', ').map(Number);
    return { px, py, pz, vx, vy, vz };
}

async function solve(hailstones) {
    const { Context } = await init();
    const { Real, Solver } = Context('main');
    
    const rx = Real.const('rx');
    const ry = Real.const('ry');
    const rz = Real.const('rz');
    const rvx = Real.const('rvx');
    const rvy = Real.const('rvy');
    const rvz = Real.const('rvz');
    
    const solver = new Solver();
    
    for (let i = 0; i < 3; i++) {
        const h = hailstones[i];
        const t = Real.const(`t${i}`);
        
        const px = Real.val(h.px);
        const py = Real.val(h.py);
        const pz = Real.val(h.pz);
        const vx = Real.val(h.vx);
        const vy = Real.val(h.vy);
        const vz = Real.val(h.vz);
        
        solver.add(t.ge(0));
        solver.add(rx.add(rvx.mul(t)).eq(px.add(vx.mul(t))));
        solver.add(ry.add(rvy.mul(t)).eq(py.add(vy.mul(t))));
        solver.add(rz.add(rvz.mul(t)).eq(pz.add(vz.mul(t))));
    }
    
    const isSat = await solver.check();
    if (isSat !== 'sat') throw new Error('No solution found');
    
    const model = solver.model();
    const result = {
        x: Number(model.eval(rx).toString()),
        y: Number(model.eval(ry).toString()),
        z: Number(model.eval(rz).toString())
    };
    
    return result.x + result.y + result.z;
}

module.exports = {
    run: async () => {
        const hailstones = input.map(parseHailstone);
        return await solve(hailstones);
    }
}