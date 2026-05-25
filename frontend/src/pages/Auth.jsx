import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Car, CheckCircle, XCircle, Loader } from 'lucide-react'
import HCaptcha from '@hcaptcha/react-hcaptcha'