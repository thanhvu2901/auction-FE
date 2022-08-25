import React, { useEffect, useState } from 'react';
import instance from 'utils/axiosClient';
import '../../styles/addproduct.scss';
import FileBase64 from 'react-file-base64';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Multiselect from 'multiselect-react-dropdown';
import { useHistory } from 'react-router';
export const AddProduct: React.FC = () => {
  const history = useHistory();
  const [product, setProduct] = useState({
    sellerId: localStorage.getItem('auction-user-id'),
    name: '',
    description: '',
    reservedPrice: '',
    priceStep: '',
    instantPrice: '',
    timeExpired: '',
    category: [],
    isRenewal: '1',
    coverImageUrl: '',
    productImage: [],
  });
  const [value, setValue] = useState('');
  const [category, set] = useState([
    {
      section: '',
      categories: [],
    },
  ]);
  function hasNull(target) {
    for (var member in target) {
      if (target[member] === '') return true;
    }
    return false;
  }
  async function submitForm() {

    console.log(product);
    if (hasNull(product)) {
      window.alert('field must not emty');
    } else {
      instance
        .post('/api/product', {
          sellerId: product.sellerId,
          name: product.name,
          description: product.description,
          reservedPrice: product.reservedPrice,
          priceStep: product.priceStep,
          instantPrice: product.instantPrice,
          timeExpired: product.timeExpired,
          category: product.category,
          isRenewal: product.isRenewal,
          coverImageUrl: product.coverImageUrl,
          productImage: product.productImage,
        })
        .then((res) => {
          window.alert('add success');
          console.log(res);
          history.push('/profile')
        })
        .catch((err) => {
          // window.alert(err.response.data.status);
          console.log(err.response);
        });
    }
  }
  useEffect(() => {
    setProduct({
      ...product,
      description: value
    })
  }, [value])
  useEffect(() => {
    instance.get('/api/category').then((res) => set(res.data));
  }, []);
  function tolist() {
    const list = []
    var temp;
    category.forEach((element: any) => {
      element.categories.forEach(element1 => {
        temp = {
          name: element1.name,
          id: element1.id
        }
        list.push(temp)
      });
    });

    return list;
  }
  function handleChange(evt) {
    var value1 = evt.target.value;
    if (evt.target.name === 'reservedPrice' || evt.target.name === 'priceStep' || evt.target.name === 'instantPrice') {
      value1 = value1.replace('-', '')
    }
    if(evt.target.name=='priceStep'&&evt.target.value==0){
      
      value1=value1.replace(0,1)

    }
    setProduct({
      ...product,
      [evt.target.name]: value1,
    });
  }

  function handlecheck(evt) {
    const value = evt.target.checked;

    if (value === true)
      setProduct({
        ...product,
        [evt.target.name]: '1',
      });
    else {
      setProduct({
        ...product,
        [evt.target.name]: '0',
      });
    }
  }
  function getFile(files) {
    if (files.size.replace(/[^0-9]/g, '') > 5000) {
      files = null;
      window.alert('file must be smaller than 5mb');
    } else {
      setProduct({
        ...product,
        coverImageUrl: files.base64,
      });
    }
  }
  function getFiles(files: any) {
    const temp = [];
    if (files.length > 5) {
      files = null
      window.alert('files must be less than 5');
      return
    }
    files.forEach((element) => {
      if (element.size.replace(/[^0-9]/g, '') > 5000) {
        files = null;
        window.alert('file must be smaller than 5mb');
        return
      } else {
        temp.push(element.base64);
      }
    });
    setProduct({
      ...product,
      productImage: temp,
    });
  }
  function onSelect(selectedList: any, selectedItem: any) {
    console.log(selectedList);
    setProduct({
      ...product,
      category: selectedList
    })

  }

  return (
    <div className="outer1">
      <div className="inner1">
        <form>
          <div className="form-1">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter product name"
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-2">
            <label>Description</label>

            <ReactQuill className='input-des' theme="snow" onChange={setValue} />
          </div>
          <div className="multi-select">
            <label>Category</label>
            <Multiselect
              options={tolist()} // Options to display in the dropdown
              //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              //  onRemove={this.onRemove} // Function will trigger on remove event
              singleSelect={true}
              displayValue="name" // Property name to display in the dropdown options
            />
          </div>
          <div className="form-3">
            <label>Price</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Enter reserve price"
              name="reservedPrice"
              onKeyUp={(e: any) => { if (e.target.value < 0) { e.target.value = e.target.value * -1 } }}
              onChange={handleChange}
            />
          </div>

          <div className="form-4">
            <label>Price step</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Enter price step"
              name="priceStep"
              onKeyUp={(e:any)=>{if(e.target.value<0){e.target.value= e.target.value * -1};if(e.target.value==0){e.target.value=''}}}
              onChange={handleChange}
            />
          </div>

          <div className="form-5">
            <label>Instant price</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="Enter instant price"
              name="instantPrice"
              onKeyUp={(e: any) => { if (e.target.value < 0) { e.target.value = e.target.value * -1 } }}
              onChange={handleChange}
            />
          </div>

          <div className="form-6">
            <input type="checkbox" name="isRenewal" onChange={handlecheck} />
            <label>Renewal</label>
          </div>

          <div>
            <label>Date Expired</label>
            <input
              type="datetime-local"
              className="form-control"
              placeholder="Enter your date"
              name="timeExpired"
              onChange={handleChange}
            />
          </div>
          <div className="form-7">
            <label>Cover image</label>
            <FileBase64 multiple={false} onDone={getFile} />
          </div>
          <div className="form-8">
            <label>Product image</label>
            <FileBase64 multiple={true} onDone={getFiles} />
          </div>
          <p className="forgot-password text-right"></p>
        </form>
        <button
          type="button"
          className="btn btn-dark btn-lg btn-block"
          onClick={submitForm}
        >
          Add
        </button>
      </div>
    </div>
  );
};
