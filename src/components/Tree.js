import { useGLTF } from '@react-three/drei'
import Tree3Model from '../model/tree3.gltf'
import Tree2Model from '../model/tree2.gltf'
import Tree1Model from '../model/tree1.gltf'

export function Tree1(props) {
  const { nodes, materials } = useGLTF(Tree1Model)
  return (
    <group {...props} dispose={null} scale={0.13}>
      <mesh geometry={nodes.treeBeech.geometry} material={materials.color_main} />
    </group>
  )
}
export function Tree2(props) {
  const { nodes, materials } = useGLTF(Tree2Model)
  return (
    <group {...props} dispose={null} scale={0.13}>
      <mesh geometry={nodes.treeLime.geometry} material={materials.color_main} />
    </group>
  )
}

export function Tree3(props) {
  const { nodes, materials } = useGLTF(Tree3Model)
  return (
    <group {...props} dispose={null} scale={0.13}>
      <mesh geometry={nodes.treeSpruce.geometry} material={materials.color_main} />
    </group>
  )
}
