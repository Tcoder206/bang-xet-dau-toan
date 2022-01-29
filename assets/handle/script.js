const inputFieldHTML = `
        <span>
          <span class="table__hidden-field js-hidden-input-x"></span>
          <input placeholder="..." spellcheck="false" class="js-input-x table__input-field"/>
        </span>`
const resolutionXValue = `
    ${inputFieldHTML}
    <div>
      <select>
        <option value=""></option>
        <option value="plus">+</option>
        <option value="minus">-</option>
      </select>
    </div>`
function scaleWidthInput(){
  const inputsX = document.querySelectorAll(".js-input-x")
  function autoResizeInput(e){
    const previousInputX = e.target.previousElementSibling
    previousInputX.textContent = e.target.value.trim().length>0?e.target.value:""
    const inputXValue = previousInputX.textContent
    e.target.style.width = `${(previousInputX.offsetWidth*1.25)-e.target.value.length}px`;
    document.querySelectorAll(".solutionOfX>span").forEach(inp=>{
      inp.style.width = e.target.style.width
    })
    if(inputXValue.length>0) e.target.value = inputXValue;
  }
  inputsX.forEach(inputX=>{
    inputX.oninput=e=>autoResizeInput(e)
    inputX.onchage=e=>autoResizeInput(e)
    inputX.onkeypress=e=>autoResizeInput(e)
  })
}
scaleWidthInput()
document.querySelectorAll(".addRows").forEach(btn=>{
    btn.onclick=()=>{
      const rows_0 = document.querySelectorAll(".table__row-0--input>span").length
      let applyXValue = `
        <span class="table__row-created">
          <div class="table__row-solutionX solutionOfX hide">
            <div>
              <select>
                <option value=""></option>
                <option value="plus">+</option>
                <option value="minus">-</option>
              </select>
            </div>
            ${resolutionXValue.repeat(rows_0)}
          </div>
        </span>`
      const table = document.querySelectorAll(".js__table");
      let insertRow;
      table.forEach(tbl=>{
        insertRow = tbl.insertRow(document.querySelectorAll(".js__table tr").length-1)
      });
      let cell_first = insertRow.insertCell(0)
      let cell_last = insertRow.insertCell(1)
      cell_first.insertAdjacentHTML("beforeend",inputFieldHTML)
      cell_last.insertAdjacentHTML("beforeend",applyXValue)
      scaleWidthInput()
      document.querySelectorAll(".solutionOfX").forEach(x=>{
        if(rows_0>0) x.classList.remove("hide")
      })
    }
})
document.querySelectorAll(".addRowX").forEach(btn=>{
  const solutionOfX = btn.parentElement.previousElementSibling
  btn.onclick=()=>{
    solutionOfX.insertAdjacentHTML("beforeend",inputFieldHTML)
    scaleWidthInput()
    document.querySelectorAll(".solutionOfX").forEach(x=>x.classList.remove("hide"))
    const lastRowsX = document.querySelectorAll(".table__row-solutionX")
    lastRowsX.forEach(lastRowX=>{
      lastRowX.parentElement.classList.remove("hide")
      lastRowX.insertAdjacentHTML("beforeend",resolutionXValue)
    })
  }
})
document.querySelectorAll('.btn-row').forEach(btnRow=>{
  let isLocked = false
  btnRow.onclick=()=>{
    isLocked = !isLocked
    document.querySelectorAll(".table__input-field,.solutionOfX>div>select").forEach(elm=>{
      document.querySelectorAll(".addRowX").forEach(btnAddRowX=>{
        document.querySelectorAll(".addRows").forEach(btnAddRows=>{
          document.querySelectorAll(".table__row-0--input").forEach(elem=>{
            document.querySelectorAll(".js-convert-img").forEach(cvtBtn=>{
              if(isLocked){
                btnRow.innerHTML = '<i class="fas fa-unlock"></i> Unlock'
                elm.classList.add('removeBorder')
                btnAddRowX.classList.add('hide')
                btnAddRows.classList.add('btn--disabled')
                cvtBtn.classList.remove('btn--disabled')
                elem.style.marginLeft="45px";
              } else {
                btnRow.innerHTML = '<i class="fas fa-lock"></i> Lock'
                elm.classList.remove('removeBorder')
                btnAddRowX.classList.remove('hide')
                btnAddRows.classList.remove('btn--disabled')
                cvtBtn.classList.add('btn--disabled')
                elem.style.marginLeft="68px"
              }
            })
          })
        })
      })
    })
  }
})
document.querySelectorAll(".js-convert-img").forEach(convertBtn=>{
  convertBtn.onclick = () =>{
    convertBtn.classList.add('btn--disabled')
    document.querySelectorAll(".container__canvas-title").forEach(title=>{
      title.innerText = "Image:"
      title.style.fontSize = "1.6rem"
      document.querySelectorAll(".js__table").forEach(tb=>{
        html2canvas(tb).then(canvas => {
            document.querySelectorAll(".container__canvas-img").forEach(cvs=>{
              cvs.appendChild(canvas)
            })
        });
      })
    })
  }
})