import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Cars } from "../models/cars.model";

export const addInCart = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const carId = req.params.carId;
    const user = await User.findOne({
      _id: userId,
    });

    const car = await Cars.findById({
      _id: carId,
    });

    if (user?.cart.some((item) => item == car?._id)) {
      return res.status(400).json({
        msg: "Car already in cart",
      });
    }

    if (car && car._id) {
      user?.cart.push(car?._id);
      await user?.save();

      return res.status(200).json({ msg: "Car added in cart" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};
export const addInFav = async (req: Request, res: Response) => {
  try {
    const userId = req.userId
    const carId = req.params.carId;
    const user = await User.findOne({
      _id: userId,
    });

    const car = await Cars.findById({
      _id: carId,
    });

    if (user?.favorite.some((item) => item == car?._id)) {
      return res.status(400).json({
        msg: "Car already in cart",
      });
    }

    if (car && car._id) {
      user?.favorite.push(car?._id);
      await user?.save();

      return res.status(200).json({ msg: "Car added in favorite" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
};


export const IncSold = async(req: Request, res:Response) => {

  try {
      const carId = req.params.carId;
      const car = await Cars.findByIdAndUpdate({
        _id: carId
      }, { $inc: { sold: 1 }, updatedAt: new Date() }, {
        new: true,
        runValidators: true
      })


      if(!car){
        return res.status(404).json({
          message: "Car not found"
        })
      }

      res.status(200).json(car)

  } catch (e) {
    res.status(500).json({
      message: e
    })
  }
}

export const IncFav = async(req: Request, res:Response) => {

  try {
      const carId = req.params.carId;
      const car = await Cars.findByIdAndUpdate({
        _id: carId
      }, { $inc: { like: 1 }, updatedAt: new Date() }, {
        new: true,
        runValidators: true
      })


      if(!car){
        return res.status(404).json({
          message: "Car not found"
        })
      }

      res.status(200).json(car)

  } catch (e) {
    res.status(500).json({
      message: e
    })
  }
}

export const DecFav = async(req: Request, res:Response) =>{
  try {
    const carId = req.params.carId;
    const car = await Cars.findByIdAndUpdate({
      _id: carId
    }, 
    { $inc: { like: -1 }, updatedAt: new Date() }
    , {
      new: true,
      runValidators: true
    })


    if(!car){
      return res.status(404).json({
        message: "Car not found"
      })
    }

    res.status(200).json(car)

} catch (e) {
  res.status(500).json({
    message: e
  })
}
}


export const removeFromCart = async (req:Request, res:Response) => {
  
  try {
    const userId = req.userId
    const carId = req.params.carId;
    const user = await User.findOne({
      _id: userId,
    });

    const car = await Cars.findById({
      _id: carId,
    });

    if (user?.cart.some((item) => item == car?._id)) {
      user.cart = user.cart.filter((item) => item.toString() !== car?._id.toString())
      await user.save();
      res.status(200).json(user)
    }

  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}

export const removeFromFav = async (req:Request, res:Response) => {
  
  try {
    const userId = req.userId
    const carId = req.params.carId;
    const user = await User.findOne({
      _id: userId,
    });

    const car = await Cars.findById({
      _id: carId,
    });

    if (user?.favorite.some((item) => item == car?._id)) {
      user.favorite = user.favorite.filter((item) => item.toString() !== car?._id.toString())
      await user.save();
      res.status(200).json(user)
    }

  } catch (err) {
    return res.status(500).json({ msg: err });
  }
}