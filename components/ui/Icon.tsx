import {
  ArrowLeft, ArrowRight, Award, BarChart3, BookOpen, Boxes, Building2, Calendar, Car, Check, ChevronDown, Clock, Code2, Cpu, Dumbbell,
  ExternalLink, FileText, Gavel, Globe, GraduationCap, HeartPulse, Home, Instagram, Layers, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Package, Palette, Phone, Plane, Printer, Rocket, Scale, Scissors, Send, Settings, Shield, ShieldCheck, ShoppingBag, ShoppingCart,
  Smartphone, Sparkles, Stamp, Store, Truck, Twitter, Users, UtensilsCrossed, Wallet, Workflow, Wrench, X, Youtube, Zap, Heart,
  Download, Languages, Headphones, Star, Quote, Search, Image as ImageIcon, Briefcase, Target, Handshake, Lightbulb, Newspaper,
  Cog, Database, CloudOff, FileDown, Route, CircleDollarSign, MonitorSmartphone, Play, Eye, Layout, Tag, Bell, Lock, RefreshCw,
  Ruler, Shirt, Coffee, Library, Music, Mic, Mic2, IceCreamCone, IceCream2, Gift, Terminal, Github, PanelRightClose, PanelRightOpen,
  Volume2, VolumeX, ChevronLeft, ChevronRight, Layers3, AudioLines, Clapperboard, Camera, Cone, type LucideIcon,
} from "lucide-react";

const ICONS = {
  ArrowLeft, ArrowRight, Award, BarChart3, BookOpen, Boxes, Building2, Calendar, Car, Check, ChevronDown, Clock, Code2, Cpu, Dumbbell,
  ExternalLink, FileText, Gavel, Globe, GraduationCap, HeartPulse, Home, Instagram, Layers, Linkedin, Mail, MapPin, Menu, MessageCircle,
  Package, Palette, Phone, Plane, Printer, Rocket, Scale, Scissors, Send, Settings, Shield, ShieldCheck, ShoppingBag, ShoppingCart,
  Smartphone, Sparkles, Stamp, Store, Truck, Twitter, Users, UtensilsCrossed, Wallet, Workflow, Wrench, X, Youtube, Zap, Heart,
  Download, Languages, Headphones, Star, Quote, Search, ImageIcon, Briefcase, Target, Handshake, Lightbulb, Newspaper,
  Cog, Database, CloudOff, FileDown, Route, CircleDollarSign, MonitorSmartphone, Play, Eye, Layout, Tag, Bell, Lock, RefreshCw,
  Ruler, Shirt, Coffee, Library, Music, Mic, Mic2, IceCreamCone, IceCream2, Gift, Terminal, Github, PanelRightClose, PanelRightOpen,
  Volume2, VolumeX, ChevronLeft, ChevronRight, Layers3, AudioLines, Clapperboard, Camera, Cone,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  /** نام آیکون lucide (رشته)؛ نام ناشناخته به Sparkles برمی‌گردد */
  name: string;
  className?: string;
  strokeWidth?: number;
}

/** نگاشت نام رشته‌ای به آیکون؛ برای عبور داده‌های سریالایزپذیر از سرور به کلاینت */
export function Icon({ name, className, strokeWidth = 1.75 }: IconProps) {
  const Cmp: LucideIcon = (ICONS as Record<string, LucideIcon>)[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" focusable="false" />;
}
