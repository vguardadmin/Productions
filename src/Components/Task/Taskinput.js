import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as Deletesvg } from '../../assets/delete.svg';
toast.configure();

const Taskinput = (props) => {


  return (
    <tr key={props.index}>
      <th scope="row">{props.index + 1}</th>
      <td>
        <input required type="date" name="date" value={props.element.date || ""} onChange={e => props.handleChange(props.index, e)} className="form-control" />
      </td>
      <td>
        <select required className="form-select" name="workStation" value={props.element.workStation || ""} onChange={e => props.handleChange(props.index, e)} aria-label="Default select example" >
          <option value={undefined} >Choose..</option>
          {props.info.sort().map((data) => (<option key={data} value={data}>{data}</option>))}
        </select>
      </td>
      <td>
        <select required className="form-select" name="model" value={props.element.model || ""} aria-label="Default select example" onChange={e => props.handleChange(props.index, e)} >
          <option value={undefined}>Choose..</option>
          {props.element.modelProp.map((data) => (<option key={data} value={data}>{data}</option>))}
        </select>
      </td>
      <td>
        <input required className="form-control" placeholder="Count" type="number" name="count" value={props.element.count || ""} onChange={e => props.handleChange(props.index, e)} />
      </td>
      <td>
        <div class="input-group">
          <input required type="number" name = "hr" placeholder="Hours" value={props.element.hr || ""} onChange={e => props.handleChange(props.index, e)} className="form-control"/>
            <input required type="number" name="min" placeholder="Minutes"  value={props.element.min || ""} onChange={e => props.handleChange(props.index, e)} className="form-control"/>
            </div>
          </td>
          <td>   {
            props.index ?
              <button type="button" className="btn btn-white" onClick={() => props.removeFormFields(props.index)}>  <Deletesvg /></button>
              : <button type="button" className="btn btn-white" disabled> <Deletesvg  /></button>
          }
          </td>
        </tr>
        )
}
        export default Taskinput;
