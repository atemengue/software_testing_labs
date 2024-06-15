export const max=(a,b)=>{
    if(a>b)return a 
    else return b
    return a
}
export const mean=(tab)=>{
  if (tab.length===0) return  tab[0]
  let mean=0
tab.map((item)=>{mean+=item/tab.length})
return mean
}