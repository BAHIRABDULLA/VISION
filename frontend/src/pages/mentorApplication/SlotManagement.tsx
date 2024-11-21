import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormControl, InputLabel, Input, InputAdornment } from '@mui/material';
import { z } from 'zod';
import { createSlot, deleteSlot, getMentorData, getSlots, updateMentorSessionPrice } from '@/services/mentorApi';
import toast, { Toaster } from 'react-hot-toast';

const priceSchema = z.object({
  singleSessionPrice: z.number({ message: "Please enter numbers" }),
  monthlySubscriptionPrice: z.number({ message: "Please enter numbers" })
})

interface Slot{
  _id:string,
  time:string,
  availableDays:string[]
}
const SlotManagement = () => {

  const [isEditPrice, setIsEditPrice] = useState(false)

  const [slots, setSlots] = useState<Slot[]>([]);
  console.log(slots,'slots')
  const [commonPrices, setCommonPrices] = useState({
    singleSessionPrice: '',
    monthlySubscriptionPrice: '',
  });
  console.log(commonPrices, 'common price ')
  const [tempPrices, setTempPrices] = useState({ ...commonPrices });
  const [errors, setErrors] = useState({
    singleSessionPrice: '',
    monthlySubscriptionPrice: '',
  })

  const handleCancelClick = () => {
    setIsEditPrice(false)
    setTempPrices({ ...commonPrices })
  }


  const handlePriceSubmit = async () => {
    const parsed = priceSchema.safeParse({
      singleSessionPrice: parseFloat(commonPrices.singleSessionPrice),
      monthlySubscriptionPrice: parseFloat(commonPrices.monthlySubscriptionPrice)
    })
    if (!parsed.success) {
      const errorMessages = parsed.error.flatten().fieldErrors;
      console.log(errorMessages, 'error messages');

      setErrors({
        singleSessionPrice: errorMessages.singleSessionPrice?.[0] || '',
        monthlySubscriptionPrice: errorMessages.monthlySubscriptionPrice?.[0] || ''
      })
      return
    }
    setErrors({ singleSessionPrice: '', monthlySubscriptionPrice: '' })
    console.log('submited dddaata', parsed.data);
    try {
      const response = await updateMentorSessionPrice(parsed.data)
      console.log(response, 'response')

      if (response?.status >= 400) {
        toast.error(response?.data.message)
      } else {
        toast.success(response?.data.message)
        setIsEditPrice(false);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
    }
  }


  const [newSlot, setNewSlot] = useState({
    time: '',
    availableDays: [] as string[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSlot({
      ...newSlot,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setNewSlot({
      ...newSlot,
      availableDays: checked
        ? [...newSlot.availableDays, value]
        : newSlot.availableDays.filter((day) => day !== value),
    });
  };



  const addSlot = async () => {

    if (newSlot.time && newSlot.availableDays.length > 0) {
      
      const data = { time: newSlot.time, availableDays: newSlot.availableDays }
      const response = await createSlot(data)
      console.log(response, 'response in add slot ');
      setSlots([
        ...slots,
        { _id: response?.data._doc._id, time: newSlot.time, availableDays: newSlot.availableDays },
      ]);
      setNewSlot({ time: '', availableDays: [] });
    }
  };


  useEffect(() => {
    const fetchPrice = async () => {
      const response = await getMentorData()
      console.log(response, 'response in fetch price');
      setCommonPrices({
        singleSessionPrice: response?.data._doc.singleSessionPrice,
        monthlySubscriptionPrice: response?.data._doc.monthlySubscriptionPrice
      })
    }
    fetchPrice()
  }, [])

  useEffect(() => {
    const fetchSlots = async () => {
      const response = await getSlots()
      console.log(response, 'response ');
      setSlots(response?.data.data)
    }
    fetchSlots()
    
  },[])
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCommonPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteSlot = async(slotId:string)=>{
    try {
      const response = await deleteSlot(slotId)
      if(response?.status===200){
        setSlots(slots.filter((s) => s._id !== slotId));
        toast.success("Slot deleted successfully")
      }else{
        toast.error("Failed to delete the slot. Please try again")
      }
    } catch (error) {
      console.error('Error founded in handle delete slot',error);
      toast.error("An error occured while deleting the slot")
    }
  }

  return (
    <div className="p-4 bg-gray-600 rounded-lg shadow-md">
      {/* Set Common Prices */}
      <Toaster />
      <div className="mt-8 text-white">
        <h2 className="text-xl font-bold mb-4">Set  Prices</h2>
        <div className="space-y-4">
          <div className='flex '>
            <FormControl fullWidth sx={{ m: 1, backgroundColor: 'white', borderRadius: '8px' }} variant="filled" >
              <InputLabel htmlFor="standard-adornment-amount">Single Session Price</InputLabel>
              <Input onChange={handlePriceChange} value={commonPrices.singleSessionPrice}
                id="standard-adornment-amount" name='singleSessionPrice'
                startAdornment={<InputAdornment position="start"> ₹ </InputAdornment>}
                disabled={!isEditPrice}
              />
              {errors.singleSessionPrice && <p className='text-red-500'>{errors.singleSessionPrice}</p>}
            </FormControl>
            <FormControl fullWidth sx={{ m: 1, backgroundColor: "white", borderRadius: '8px' }} variant="filled">
              <InputLabel htmlFor="standard-adornment-amount">Monthly Subscription Price</InputLabel>
              <Input onChange={handlePriceChange} value={commonPrices.monthlySubscriptionPrice}
                id="standard-adornment-amount" name='monthlySubscriptionPrice'
                startAdornment={<InputAdornment position="start"> ₹ </InputAdornment>}
                disabled={!isEditPrice}
              />
              {errors.monthlySubscriptionPrice && <p className='text-red-500'>{errors.monthlySubscriptionPrice}</p>}
            </FormControl>
          </div>


          <div className="flex gap-6">
            {isEditPrice ? (
              <>
                <Button variant="contained" onClick={handlePriceSubmit} color="primary" >Save</Button>
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>Cancel</Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setIsEditPrice(!isEditPrice)}>Edit</Button>
            )}
          </div>
        </div>
      </div>

      {/* Add New Slot */}
      <div className="mt-8 text-white">
        <h2 className="text-xl font-bold mb-4">Add New Slot</h2>
        <div className="space-y-4">
          <TextField
            label="Time"
            type="time"
            name="time"
            value={newSlot.time}
            onChange={handleInputChange}
            variant="filled"
            fullWidth sx={{ backgroundColor: "white", borderRadius: "8px" }}
            InputLabelProps={{ shrink: true }}
            color="primary"
          />
          <div className="text-white mb-2">availableDays (Days):</div>
          <div className="flex space-x-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    value={day}
                    checked={newSlot.availableDays.includes(day)}
                    onChange={handleAvailabilityChange}
                    color="primary"
                  />
                }
                label={day}
              />
            ))}
          </div>
          <Button onClick={addSlot} variant="contained" color="primary" className="w-full mt-4">
            Add Slot
          </Button>
        </div>
      </div>

      {/* Existing Slots */}
      <div className="mt-8 text-white">
        <h2 className="text-xl font-bold mb-4">Existing Slots</h2>
        <div className="space-y-2">
          {slots.length>=0&&slots.map((slot) => (
            <div
              key={slot._id}
              className="bg-gray-100 rounded px-4 py-2 flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-black">{slot.time}</div>
                <div className="text-gray-600">Available Days: {slot.availableDays.join(', ')}</div>

              </div>
              <button
                className="text-red-500 hover:text-red-700"
                // onClick={() => setSlots(slots.filter((s) => s._id !== slot._id))}
                onClick={()=>handleDeleteSlot(slot._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotManagement;
